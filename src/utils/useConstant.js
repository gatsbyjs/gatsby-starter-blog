import { useMemo } from 'react';

export default function useConstant(builder) {
  return useMemo(builder, []);
}