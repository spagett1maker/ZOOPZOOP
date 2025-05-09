'use client';

import { useState } from 'react';

interface DetailInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (section: 'detailInfo', data: {
    size: string;
    rooms: string;
    bathrooms: string;
    floor: string;
    totalFloors: string;
    parkingAvailable: boolean;
    elevator: boolean;
    moveInDate: string;
    features: string[];
  }) => void;
  data: {
    size: string;
    rooms: string;
    bathrooms: string;
    floor: string;
    totalFloors: string;
    parkingAvailable: boolean;
    elevator: boolean;
    moveInDate: string;
    features: string[];
  };
}

export default function DetailInfo({ onNext, onPrev, updateFormData, data }: DetailInfoProps) {
  const [formData, setFormData] = useState({
    size: data.size || '',
    rooms: data.rooms || '',
    bathrooms: data.bathrooms || '',
    floor: data.floor || '',
    totalFloors: data.totalFloors || '',
    parkingAvailable: data.parkingAvailable || false,
    elevator: data.elevator || false,
    moveInDate: data.moveInDate || '',
    features: data.features || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData('detailInfo', formData);
    onNext();
  };

  const inputStyle = "mt-1 block w-full rounded-lg bg-gray-100 border-none px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const checkboxStyle = "h-4 w-4 text-blue-600 bg-gray-100 border-none rounded focus:ring-2 focus:ring-orange-500";

  const features = [
    '에어컨',
    '세탁기',
    '냉장고',
    '인덕션',
    '전자레인지',
    '옷장',
    '신발장',
    '싱크대',
    '도어락',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="size" className={labelStyle}>
            면적 (m²)
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="면적을 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="rooms" className={labelStyle}>
            방 개수
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="방 개수를 입력해주세요"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bathrooms" className={labelStyle}>
            화장실 개수
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="화장실 개수를 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="floor" className={labelStyle}>
            해당 층수
          </label>
          <input
            type="number"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="층수를 입력해주세요"
          />
        </div>
      </div>

      <div>
        <label htmlFor="totalFloors" className={labelStyle}>
          건물 전체 층수
        </label>
        <input
          type="number"
          id="totalFloors"
          name="totalFloors"
          value={formData.totalFloors}
          onChange={handleChange}
          required
          className={inputStyle}
          placeholder="전체 층수를 입력해주세요"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="parkingAvailable"
            name="parkingAvailable"
            checked={formData.parkingAvailable}
            onChange={handleChange}
            className={checkboxStyle}
          />
          <label htmlFor="parkingAvailable" className="ml-2 block text-sm text-gray-700">
            주차 가능
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="elevator"
            name="elevator"
            checked={formData.elevator}
            onChange={handleChange}
            className={checkboxStyle}
          />
          <label htmlFor="elevator" className="ml-2 block text-sm text-gray-700">
            엘리베이터
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="moveInDate" className={labelStyle}>
          입주 가능일
        </label>
        <input
          type="date"
          id="moveInDate"
          name="moveInDate"
          value={formData.moveInDate}
          onChange={handleChange}
          required
          className={inputStyle}
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">옵션 항목</span>
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={feature}
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className={checkboxStyle}
              />
              <label htmlFor={feature} className="ml-2 block text-sm text-gray-700">
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          이전
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          다음
        </button>
      </div>
    </form>
  );
} 