"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Subdivision } from '@/types/type';
import Image from 'next/image';

export default function SubdivisionList() {
  const [subdivisions, setSubdivisions] = useState<Subdivision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubdivisions() {
      try {
        const { data, error } = await supabase
          .from('subdivisions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubdivisions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchSubdivisions();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (subdivisions.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {subdivisions.map((subdivision) => (
        <div key={subdivision.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-2">{subdivision.subdivision_name}</h2>
          <p className="text-gray-600 mb-2">{subdivision.address}</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">전체 세대수</p>
              <p>{subdivision.units_number}세대</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">입주 예정일</p>
              <p>{subdivision.move_in_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">분양 시작일</p>
              <p>{subdivision.sales_start_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">가격</p>
              <p>{subdivision.price ? subdivision.price.toLocaleString() : '가격 정보 없음'}원</p>
            </div>
          </div>
          {subdivision.images && subdivision.images.length > 0 && (
            <Image
              src={subdivision.images[0]}
              alt={subdivision.subdivision_name || '분양 정보'}
              className="w-full h-48 object-cover mt-4 rounded"
              width={100}
              height={100}
            />
          )}
        </div>
      ))}
    </div>
  );
} 