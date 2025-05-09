'use client';

import { useState } from 'react';

interface LocationInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (section: 'locationInfo', data: {
    address: string;
    detailAddress: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  }) => void;
  data: {
    address: string;
    detailAddress: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  };
}

export default function LocationInfo({ onNext, onPrev, updateFormData, data }: LocationInfoProps) {
  const [formData, setFormData] = useState({
    address: data.address || '',
    detailAddress: data.detailAddress || '',
    zipCode: data.zipCode || '',
    latitude: data.latitude || '',
    longitude: data.longitude || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData('locationInfo', formData);
    onNext();
  };

  const inputStyle = "mt-1 block w-full rounded-lg bg-gray-100 border-none px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle = "inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="address" className={labelStyle}>
          주소
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="기본 주소"
          />
          <button
            type="button"
            className={buttonStyle}
          >
            주소 검색
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="detailAddress" className={labelStyle}>
          상세 주소
        </label>
        <input
          type="text"
          id="detailAddress"
          name="detailAddress"
          value={formData.detailAddress}
          onChange={handleChange}
          className={inputStyle}
          placeholder="상세 주소를 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="zipCode" className={labelStyle}>
          우편번호
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className={inputStyle}
          placeholder="우편번호를 입력해주세요"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className={labelStyle}>
            위도
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="위도를 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="longitude" className={labelStyle}>
            경도
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="경도를 입력해주세요"
          />
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