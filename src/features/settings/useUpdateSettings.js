/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,

    mutate: updateSettings,
  } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success('Settings successfully updated.');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
}
