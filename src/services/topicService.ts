import topicsData from "@/data/topics.json";
import { Topic } from "@/types";

const topics: Topic[] = topicsData as Topic[];

export function getTopics(): Topic[] {
  return topics;
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
