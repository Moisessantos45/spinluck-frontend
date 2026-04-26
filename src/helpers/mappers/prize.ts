import type { Prize } from "@/entities/prize";
import { getNumber, getString } from "./formatters";

const mapperPrize = (data: Record<string, unknown>): Prize => {
  return {
    id: getNumber(data.id),
    title: getString(data.title),
    description: getString(data.description),
    imageUrl: getString(data.image_url),
    organizerId: getNumber(data.organizer_id),
    createdAt: new Date(getString(data.created_at, new Date().toISOString())),
    updatedAt: new Date(getString(data.updated_at, new Date().toISOString())),
    raffleId: getNumber(data.raffle_id),
  };
};

const prizeToJson = (prize: Partial<Prize>) => ({
  title: prize.title,
  description: prize.description,
  image_url: prize.imageUrl,
  raffle_id: prize.raffleId,
});

export { mapperPrize, prizeToJson };
