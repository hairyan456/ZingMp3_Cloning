import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import { path } from '../utils/constant';
import { getChartHome } from '../services/musicService';
import { toast } from 'react-toastify';

const PublicPage = lazy(() => import('../pages/public/PublicPage'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const PlaylistPage = lazy(() => import('../pages/public/PLaylistPage'));
const WeekRankPage = lazy(() => import('../pages/public/WeekRankPage'));
const ZingChartPage = lazy(() => import('../pages/public/ZingChartPage'));
const SearchPage = lazy(() => import('../pages/public/SearchPage'));
const SongSearch = lazy(() => import('../modules/search/SongSearch'));
const PlaylistSearch = lazy(() => import('../modules/search/PlaylistSearch'));
const AllSearch = lazy(() => import('../modules/search/AllSearch'));
const SingerPage = lazy(() => import('../pages/public/SingerPage'));

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Đảm bảo toàn màn hình
  background-color: #f5f5f5; // Màu nền

  .spinner {
    width: 50px; // Kích thước vòng tròn
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1); // Viền mờ
    border-top: 5px solid #3498db; // Viền nổi bật
    border-radius: 50%; // Biến thành hình tròn
    animation: spin 1s linear infinite; // Hiệu ứng quay
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AppRoute = () => {
  const [chartData, setChartData] = useState({});

  const fetchChartHome = async () => {
    try {
      let res = await getChartHome();
      if (res?.err === 0) {
        setChartData(res?.data)
      }
      else toast.warn(res?.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    fetchChartHome();
  }, []);

  return (
    <Suspense fallback={<LoadingContainer><div className='spinner' /></LoadingContainer>}>
      <Routes>
        <Route path={path.HOME} element={<PublicPage />}>
          <Route index element={<HomePage />} />
          <Route path={path.PLAYLIST__TITLE__PID} element={<PlaylistPage />} />
          <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRankPage weekChart={chartData?.weekChart && Object.values(chartData.weekChart)} />} />
          <Route path={path.ZING_CHART} element={<ZingChartPage chartData={chartData} />} />
          <Route path={path.HOME__SINGER} element={<SingerPage />} />
          <Route path={path.HOME__ARTIST__SINGER} element={<SingerPage />} />
          <Route path={path.SEACH} element={<SearchPage />} >
            <Route path={path.ALL} element={<AllSearch />} />
            <Route path={path.SONG} element={<SongSearch />} />
            <Route path={path.PLAYLIST_SEARCH} element={<PlaylistSearch />} />
          </Route>
          <Route path="*" element={<>404: Not found page</>} />
        </Route>
        <Route path={path.LOGIN} element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;