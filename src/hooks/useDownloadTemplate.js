import { useState } from 'react';
import { downloadFile } from '../utils/downloadApi';
import { CONNECTION_ID } from '../constants/api';

export const useDownloadTemplate = ({ tableName, columns, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const payload = {
        data: {
          connectionId: CONNECTION_ID,
          tables: [{ tableName, columns }],
        },
      };
      await downloadFile(payload, fileName);
    } catch (error) {
      console.error("Template download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
