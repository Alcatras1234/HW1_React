import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const RandomNumber: React.FC = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    setNumber(randomNum);
  }, []);

  const lastMessageDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      {number !== null && (
        <p>
          {t('unreadMessage', {
            count: number,
            number,
            date: lastMessageDate,
          })}
        </p>
      )}
    </div>
  );
};

export default RandomNumber;