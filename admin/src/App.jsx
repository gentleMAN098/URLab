import { useMemo, useState, Suspense, useEffect } from 'react';
import { useMemo, useState, Suspense, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update } from 'idb-keyval';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update } from 'idb-keyval';

import { getFetch, postFetch } from './api/fetching';
import { fetchSettings } from './api/settings';
import { fetchLangs } from './api/fetchLangs';
import { getFetch, postFetch } from './api/fetching';
import { fetchSettings } from './api/settings';
import { fetchLangs } from './api/fetchLangs';

import hexToHSL from './lib/hexToHSL';
import hexToHSL from './lib/hexToHSL';

import Notifications from './components/Notifications';
import MainMenu from './components/MainMenu';
import DynamicModule from './components/DynamicModule';
import Header from './components/Header';
import Notifications from './components/Notifications';
import MainMenu from './components/MainMenu';
import DynamicModule from './components/DynamicModule';
import Header from './components/Header';

import './assets/styles/style.scss';
import './assets/styles/style.scss';

import { useSelectableItems } from './hooks/useSelectableItems';
import { useSelectableItems } from './hooks/useSelectableItems';

export default function App() {
  const queryClient = useQueryClient();
  const [prefetch, setPrefetch] = useState(true);

  useEffect(() => {
    if (prefetch) {
      update('apiKeySet', () => true);
      update('apiKeySet', () => true);
      // Checking if API is set in advance
      async function getApiKey() {
        const generalData = await queryClient.fetchQuery({
          queryKey: ['general'],
          queryFn: () => fetchSettings('general').then((data) => data),
          queryKey: ['general'],
          queryFn: () => fetchSettings('general').then((data) => data),
          refetchOnWindowFocus: false,
        });

        const isApiObject = generalData?.filter((dataset) => dataset.id === 'api')[0];
        const hasApiKey = isApiObject?.options['urlslab-api-key'].value;
        const isApiObject = generalData?.filter((dataset) => dataset.id === 'api')[0];
        const hasApiKey = isApiObject?.options['urlslab-api-key'].value;

        if (!hasApiKey) {
          update('apiKeySet', () => false);
          update('apiKeySet', () => false);
        }
      }
      getApiKey();

      // Creating languages query object in advance
      queryClient.prefetchQuery({
        queryKey: ['languages'],
        queryKey: ['languages'],
        queryFn: async () => await fetchLangs(),
        refetchOnWindowFocus: false,
      });

      /* Creating all endpoints query object in advance
			to check for allowed+required import/insert/edit CSV fields */
      queryClient.prefetchQuery({
        queryKey: ['routes'],
        queryKey: ['routes'],
        queryFn: async () => {
          const response = await getFetch();
          if (response.ok) {
            return response.json();
          }
        },
        refetchOnWindowFocus: false,
      });

      // Creating Tags/Labels query object in advance
      queryClient.prefetchQuery({
        queryKey: ['label', 'menu'],
        queryKey: ['label', 'menu'],
        queryFn: async () => {
          const tags = await postFetch('label', { rows_per_page: 500 });
          const tags = await postFetch('label', { rows_per_page: 500 });
          const tagsArray = await tags.json();
          tagsArray?.map((tag) => {
            const { lightness } = hexToHSL(tag.bgcolor);
            if (lightness < 70) {
              return (tag.className = 'dark');
              return (tag.className = 'dark');
            }
            return tag;
          });
          return tagsArray;
        },
        refetchOnWindowFocus: false,
      });

      // Creating Tags/Labels query object in advance
      queryClient.prefetchQuery({
        queryKey: ['label', 'modules'],
        queryKey: ['label', 'modules'],
        queryFn: async () => {
          const response = await getFetch('label/modules');
          const response = await getFetch('label/modules');
          if (response.ok) {
            return response.json();
          }
        },
        refetchOnWindowFocus: false,
      });

      setPrefetch(false);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ['modules'],
    queryKey: ['modules'],
    queryFn: async () => {
      if (prefetch) {
        const response = await getFetch('module').then((ModuleData) => ModuleData);
        const response = await getFetch('module').then((ModuleData) => ModuleData);
        if (response.ok) {
          return response.json();
        }
      }
    },
    refetchOnWindowFocus: false,
  });

  const fetchedModules = useMemo(() => {
    delete data?.general;
    return data;
  }, [data]);

  return (
    <div className="urlslab-app flex">
      {fetchedModules && (
        <Suspense>
          <MainMenu modules={!fetchedModules || Object.values(fetchedModules)} />
          <MainMenu modules={!fetchedModules || Object.values(fetchedModules)} />
        </Suspense>
      )}

      <div className="urlslab-app-main">
        <Header fetchedModules={fetchedModules} />
        <DynamicModule modules={!fetchedModules || Object.values(fetchedModules)} />
        <DynamicModule modules={!fetchedModules || Object.values(fetchedModules)} />
      </div>
      <Notifications />
    </div>
  );
}
