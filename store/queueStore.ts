import { create } from "zustand";

interface QueueState {
  activeQueueId: string | null;
  position: number | null;
  startTime: Date | null;
  joinQueue: (placeId: string) => void;
  leaveQueue: () => void;
}

export const useQueueStore = create<QueueState>((set) => ({
  activeQueueId: null,
  position: null,
  startTime: null,
  joinQueue: (placeId) =>
    set({
      activeQueueId: placeId,
      position: Math.floor(Math.random() * 10) + 1, // Mock position
      startTime: new Date(),
    }),
  leaveQueue: () =>
    set({ activeQueueId: null, position: null, startTime: null }),
}));
