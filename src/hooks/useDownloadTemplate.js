import { useState } from 'react';
import { downloadFile } from '../utils/downloadApi';

export const useDownloadTemplate = ({ tableName, columns, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const payload = {
        data: {
          connectionId: "af995f25-c513-11f0-8899-bb17b82660ad",
          tables: [
            {
              tableName: tableName,
              columns: columns
            }
          ]
        }
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
