import { useCursor, useTexture } from "@react-three/drei";
import {
  useFrame,
  type ThreeElements,
  type ThreeEvent,
} from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshBasicMaterial,
  SRGBColorSpace,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
  type Group,
  type Texture,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import {
  backCoverImageSrc,
  frontCoverImageSrc,
  pageAtom,
  pages,
  type PageData,
} from "./pages";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;
const PAGE_TURN_DURATION_MS = 400;
const PAGE_TURN_FAST_STEP_MS = 50;
const PAGE_TURN_SLOW_STEP_MS = 150;
const INTERACTION_BUFFER_MS = 60;
const MOBILE_DRAG_THRESHOLD_PX = 12;
const MOBILE_MAX_TILT_X = degToRad(18);
const MOBILE_MAX_TILT_Y = degToRad(22);
const MOBILE_TILT_FACTOR = 0.0035;
const MOBILE_TILT_EASING = 0.2;
const MOBILE_DRAG_GUARD_MS = 220;
const BOOK_BASE_ROTATION_Y = -Math.PI / 2 + degToRad(-1);
const BOOK_BASE_ROTATION_X = degToRad(40);

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;
const FRONT_CLOSED_CENTER_OFFSET = -PAGE_WIDTH * 0.95;
const OPEN_BOOK_CENTER_OFFSET = -PAGE_WIDTH * 0.04;
const BACK_CLOSED_CENTER_OFFSET = PAGE_WIDTH * 0.45;
const NARROW_VIEWPORT_BREAKPOINT_PX = 700;
const NARROW_OPEN_BOOK_RIGHT_SHIFT = PAGE_WIDTH * 0.08;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
);
pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const positionAttr = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < positionAttr.count; i++) {
  vertex.fromBufferAttribute(positionAttr, i);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4),
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4),
);

const HOVER_TINT_COLOR = new Color("#ffd9b0");

const pageMaterials = [
  new MeshBasicMaterial({ color: "#b89a6e", toneMapped: false }), // tranche gauche
  new MeshBasicMaterial({ color: "#111", toneMapped: false }),
  new MeshBasicMaterial({ color: "#b89a6e", toneMapped: false }), // tranche haut
  new MeshBasicMaterial({ color: "#b89a6e", toneMapped: false }), // tranche bas
];

type PageProps = PageData & {
  number: number;
  page: number;
  opened: boolean;
  bookClosed: boolean;
  canInteract: boolean;
  canChangePage: () => boolean;
  onPageChange: Dispatch<SetStateAction<number>>;
};

const Page = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  canInteract,
  canChangePage,
  onPageChange,
}: PageProps) => {
  const group = useRef<Group>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<SkinnedMesh>(null);

  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = canInteract && isHovered;
  useCursor(isHighlighted);

  const { backTexture, frontTexture } = useTexture({
    frontTexture: front.imageSrc ?? frontCoverImageSrc,
    backTexture: back.imageSrc ?? backCoverImageSrc,
  }) as {
    backTexture: Texture;
    frontTexture: Texture;
  };

  useEffect(() => {
    [frontTexture, backTexture].forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [backTexture, frontTexture]);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);
    }
    const skeleton = new Skeleton(bones);

    const frontMaterial = new MeshBasicMaterial({
      color: front.imageSrc ? "#ffffff" : front.color,
      map: front.imageSrc ? frontTexture : null,
      toneMapped: false,
    });
    frontMaterial.userData.baseColor = frontMaterial.color.clone();
    const backMaterial = new MeshBasicMaterial({
      color: back.imageSrc ? "#ffffff" : back.color,
      map: back.imageSrc ? backTexture : null,
      toneMapped: false,
    });
    backMaterial.userData.baseColor = backMaterial.color.clone();

    const materials = [...pageMaterials, frontMaterial, backMaterial];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [
    back.color,
    back.imageSrc,
    backTexture,
    front.color,
    front.imageSrc,
    frontTexture,
  ]);

  const hoverAmountRef = useRef(0);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;

    const matArr = skinnedMeshRef.current.material as MeshBasicMaterial[];
    hoverAmountRef.current = MathUtils.lerp(
      hoverAmountRef.current,
      isHighlighted ? 1 : 0,
      0.1,
    );
    [matArr[4], matArr[5]].forEach((mat) => {
      const base = mat.userData.baseColor as Color;
      mat.color.copy(base).lerp(HOVER_TINT_COLOR, hoverAmountRef.current * 0.4);
    });

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }
    let turningTime = Math.min(400, +new Date() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) targetRotation += degToRad(number * 0.8);

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current! : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;
      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta,
      );

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;
      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta,
      );
    }
  });

  return (
    <group
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (!canInteract) return;
        setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!canInteract || !canChangePage()) return;
        onPageChange(opened ? number : number + 1);
        setIsHovered(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

type Book3DProps = ThreeElements["group"] & {
  canTiltBook?: boolean;
};

type DragState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  startTiltX: number;
  startTiltY: number;
  isDragging: boolean;
};

type PointerCaptureTarget = EventTarget & {
  releasePointerCapture: (pointerId: number) => void;
  setPointerCapture: (pointerId: number) => void;
};

export const Book3D = ({ canTiltBook = false, ...props }: Book3DProps) => {
  const [page, setPage] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth < NARROW_VIEWPORT_BREAKPOINT_PX,
  );
  const group = useRef<Group>(null);
  const interactionLockRef = useRef(false);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startTiltX: 0,
    startTiltY: 0,
    isDragging: false,
  });
  const dragGuardUntilRef = useRef(0);
  const tiltTargetRef = useRef({ x: 0, y: 0 });
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const canInteract = page === delayedPage && !isInteractionLocked;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const goToPage = () => {
      setDelayedPage((current) => {
        if (page === current) return current;
        timeout = setTimeout(goToPage, Math.abs(page - current) > 2 ? 50 : 150);
        if (page > current) return current + 1;
        if (page < current) return current - 1;
        return current;
      });
    };
    goToPage();
    return () => clearTimeout(timeout);
  }, [page]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowViewport(window.innerWidth < NARROW_VIEWPORT_BREAKPOINT_PX);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange: Dispatch<SetStateAction<number>> = (nextPage) => {
    if (interactionLockRef.current) return;

    const resolvedPage =
      typeof nextPage === "function" ? nextPage(page) : nextPage;

    if (resolvedPage === page) return;

    const pageDistance = Math.abs(resolvedPage - delayedPage);
    const stepDuration =
      pageDistance > 2 ? PAGE_TURN_FAST_STEP_MS : PAGE_TURN_SLOW_STEP_MS;
    const animationDuration =
      PAGE_TURN_DURATION_MS +
      Math.max(0, pageDistance - 1) * stepDuration +
      INTERACTION_BUFFER_MS;

    interactionLockRef.current = true;
    setIsInteractionLocked(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      interactionLockRef.current = false;
      setIsInteractionLocked(false);
      interactionTimeoutRef.current = null;
    }, animationDuration);

    setPage(resolvedPage);
  };

  const canChangePage = () => performance.now() >= dragGuardUntilRef.current;

  const resetDragState = () => {
    dragStateRef.current.pointerId = null;
    dragStateRef.current.isDragging = false;
  };

  const getPointerCaptureTarget = (
    event: ThreeEvent<PointerEvent>,
  ): PointerCaptureTarget | null => {
    const target = event.target;
    if (!target) return null;

    const captureTarget = target as PointerCaptureTarget;
    if (typeof captureTarget.setPointerCapture !== "function") return null;

    return captureTarget;
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!canTiltBook || event.pointerType !== "touch") return;

    dragStateRef.current.pointerId = event.pointerId;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startTiltX = tiltTargetRef.current.x;
    dragStateRef.current.startTiltY = tiltTargetRef.current.y;
    dragStateRef.current.isDragging = false;
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!canTiltBook || event.pointerType !== "touch") return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    const hasReachedThreshold =
      Math.abs(deltaX) > MOBILE_DRAG_THRESHOLD_PX ||
      Math.abs(deltaY) > MOBILE_DRAG_THRESHOLD_PX;

    if (!dragStateRef.current.isDragging) {
      if (!hasReachedThreshold) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        resetDragState();
        return;
      }

      event.stopPropagation();
      getPointerCaptureTarget(event)?.setPointerCapture(event.pointerId);
      dragStateRef.current.isDragging = true;
      dragGuardUntilRef.current = performance.now() + MOBILE_DRAG_GUARD_MS;
    }

    event.stopPropagation();

    tiltTargetRef.current.x = MathUtils.clamp(
      dragStateRef.current.startTiltX - deltaY * MOBILE_TILT_FACTOR,
      -MOBILE_MAX_TILT_X,
      MOBILE_MAX_TILT_X,
    );
    tiltTargetRef.current.y = MathUtils.clamp(
      dragStateRef.current.startTiltY - deltaX * MOBILE_TILT_FACTOR,
      -MOBILE_MAX_TILT_Y,
      MOBILE_MAX_TILT_Y,
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!canTiltBook || event.pointerType !== "touch") return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    if (dragStateRef.current.isDragging) {
      event.stopPropagation();
      getPointerCaptureTarget(event)?.releasePointerCapture(event.pointerId);
      dragGuardUntilRef.current = performance.now() + MOBILE_DRAG_GUARD_MS;
    }

    resetDragState();
  };

  useFrame((_, delta) => {
    if (!group.current) return;

    const openBookOffset = isNarrowViewport
      ? OPEN_BOOK_CENTER_OFFSET + NARROW_OPEN_BOOK_RIGHT_SHIFT
      : OPEN_BOOK_CENTER_OFFSET;

    const targetPositionX =
      delayedPage === 0
        ? FRONT_CLOSED_CENTER_OFFSET
        : delayedPage === pages.length
          ? BACK_CLOSED_CENTER_OFFSET
          : openBookOffset;

    easing.damp(group.current.position, "x", targetPositionX, 0.35, delta);
    easing.dampAngle(
      group.current.rotation,
      "x",
      BOOK_BASE_ROTATION_X + tiltTargetRef.current.x,
      MOBILE_TILT_EASING,
      delta,
    );
    easing.dampAngle(
      group.current.rotation,
      "y",
      BOOK_BASE_ROTATION_Y + tiltTargetRef.current.y,
      MOBILE_TILT_EASING,
      delta,
    );
  });

  return (
    <group
      {...props}
      ref={group}
      rotation-y={BOOK_BASE_ROTATION_Y}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {pages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          canInteract={canInteract}
          canChangePage={canChangePage}
          onPageChange={handlePageChange}
          {...pageData}
        />
      ))}
    </group>
  );
};
