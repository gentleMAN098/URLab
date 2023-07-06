// eslint-disable-next-line import/no-extraneous-dependencies

import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { getFetch } from '../api/fetching';
import '../assets/styles/layouts/_Roles.scss';
import Table from '../components/TableComponent';
import { createColumnHelper } from '@tanstack/react-table';
import ModuleViewHeaderBottom from '../components/ModuleViewHeaderBottom';
import ModuleViewHeader from '../components/ModuleViewHeader';

export default function Roles({ moduleId }) {
  const [activeSection, setActiveSection] = useState('overview');

  console.log('moduleId', moduleId);
  const slug = 'roles';

  const RoleTable = lazy(() => import(`../tables/RoleTable.jsx`));
  const UserTable = lazy(() => import(`../tables/UserTable.jsx`));

  const tableMenu = new Map([
    [slug, 'Roles'],
    ['user', 'Users'],
  ]);

  return (
    <div className="urlslab-roles">
      <ModuleViewHeader
        moduleId={moduleId}
        moduleMenu={tableMenu}
        noSettings
        activeMenu={(activemenu) => setActiveSection(activemenu)}
      />
      {activeSection === slug && (
        <div className="urlslab-tableView">
          <Suspense>
            <RoleTable />
          </Suspense>
        </div>
      )}
      {activeSection === 'user' && (
        <div className="urlslab-tableView">
          <Suspense>
            <UserTable />
          </Suspense>
        </div>
      )}
    </div>
  );
}
