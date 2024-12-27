import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { path } from '../utils/constant';

const PublicPage = lazy(() => import('../pages/public/PublicPage'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const PlaylistPage = lazy(() => import('../pages/public/PLaylistPage'));
const WeekRankPage = lazy(() => import('../pages/public/WeekRankPage'));

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
  return (
    <Suspense fallback={<LoadingContainer><div className='spinner' /></LoadingContainer>}>
      <Routes>
        <Route path={path.HOME} element={<PublicPage />}>
          <Route index element={<HomePage />} />
          <Route path={path.PLAYLIST__TITLE__PID} element={<PlaylistPage />} />
          <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRankPage />} />
          <Route path="*" element={<>404: Not found page</>} />
        </Route>
        <Route path={path.LOGIN} element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;