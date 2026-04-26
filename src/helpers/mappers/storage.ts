import { getDateToString, getNumber, getString } from "./formatters";

const mapperStorage = (data: Record<string, unknown>) => {
  return {
    id: getNumber(data.id),
    file_id: getString(data.file_id),
    path: getString(data.path),
    mime_type: getString(data.mime_type),
    size: getNumber(data.size),
    user_id: getNumber(data.user_id),
    url: getString(data.url),
    created_at: getDateToString(data.created_at),
    updated_at: getDateToString(data.updated_at),
  };
};

export { mapperStorage };
