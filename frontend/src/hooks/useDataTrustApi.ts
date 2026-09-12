import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTrustApiClient } from '../services/apiClient';

export const useDatasets = (domain?: string) => {
  return useQuery({
    queryKey: ['datasets', domain],
    queryFn: () => DataTrustApiClient.getDatasets(domain),
    staleTime: 1000 * 30,
  });
};

export const useQualityRules = (datasetId?: string) => {
  return useQuery({
    queryKey: ['qualityRules', datasetId],
    queryFn: () => DataTrustApiClient.getQualityRules(datasetId),
    staleTime: 1000 * 30,
  });
};

export const useRegisterDatasetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { name: string; domain: string; dataSource: string; description: string }) =>
      DataTrustApiClient.registerDataset(params.name, params.domain, params.dataSource, params.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });
};

export const useAnomalyDetectionMutation = () => {
  return useMutation({
    mutationFn: (params: { values: number[]; contamination?: number }) =>
      DataTrustApiClient.detectAnomalies(params.values, params.contamination),
  });
};
