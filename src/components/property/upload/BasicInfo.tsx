'use client';

import { useState } from 'react';

interface BasicInfoProps {
  onNext: () => void;
  updateFormData: (section: 'basicInfo', data: {
    title: string;
    propertyType: string;
    transactionType: string;
    price: string;
    description: string;
  }) => void;
  data: {
    title: string;
    propertyType: string;
    transactionType: string;
    price: string;
    description: string;
  };
}

export default function BasicInfo({ onNext, updateFormData, data }: BasicInfoProps) {
  const [formData, setFormData] = useState({
    title: data.title || '',
    propertyType: data.propertyType || '',
    transactionType: data.transactionType || '',
    price: data.price || '',
    description: data.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData('basicInfo', formData);
    onNext();
  };

  const inputStyle = "mt-1 block w-full rounded-lg bg-gray-100 border-none px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const selectStyle = "mt-1 block w-full rounded-lg bg-gray-100 border-none px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelStyle}>
          매물 제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={inputStyle}
          placeholder="매물 제목을 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="propertyType" className={labelStyle}>
          매물 종류
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
          className={selectStyle}
        >
          <option value="">선택해주세요</option>
          <option value="apartment">아파트</option>
          <option value="house">주택</option>
          <option value="officetel">오피스텔</option>
          <option value="commercial">상가</option>
        </select>
      </div>

      <div>
        <label htmlFor="transactionType" className={labelStyle}>
          거래 종류
        </label>
        <select
          id="transactionType"
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          required
          className={selectStyle}
        >
          <option value="">선택해주세요</option>
          <option value="sale">매매</option>
          <option value="jeonse">전세</option>
          <option value="monthly">월세</option>
        </select>
      </div>

      <div>
        <label htmlFor="price" className={labelStyle}>
          가격
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className={inputStyle}
          placeholder="만원 단위로 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelStyle}>
          상세 설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={inputStyle}
          placeholder="상세 설명을 입력해주세요"
        />
      </div>

      <div className="flex justify-end">
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