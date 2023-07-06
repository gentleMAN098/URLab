import { useEffect, useMemo, useState } from 'react';
import { getFetch } from '../api/fetching';
import ModuleViewHeaderBottom from '../components/ModuleViewHeaderBottom';
import Table from '../components/TableComponent';
import { createColumnHelper } from '@tanstack/react-table';

export default function RoleTable() {
  const roleSlug = 'permission/role';
  const userSlug = 'permission/user';

  const header = {
    name: 'Name',
    modules: 'Allowed',
  };
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const roleRes = await getFetch(roleSlug);
      const roleData = await roleRes.json();
      const userRes = await getFetch(userSlug);
      const userData = await userRes.json();

      const normalizeTableData = roleData.reduce((acc, cur) => {
        acc = [
          ...acc,
          {
            label: cur.role.name,
            capabilities: Object.keys(cur.role.capabilities).length,
            user: userData.filter((it) => it.roles[0] === cur.role_key).length,
          },
        ];
        return acc;
      }, []);
      console.log('normalizeTableData', normalizeTableData);
      setRoles(normalizeTableData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = [
    columnHelper.accessor('Role'),
    columnHelper.accessor('Capabilities'),
    columnHelper.accessor('Users'),
  ];

  return (
    <>
      <ModuleViewHeaderBottom
        noColumnsMenu
        noExport
        noImport
        noFiltering
        noCount
        hideActions
        options={{ header, notWide: true, title: 'Add new role', id: 'name' }}
      />
      <div>
        <Table
          className="fadeInto"
          slug={roleSlug}
          columns={columns}
          // returnTable={(returnTable) => console.log('return table:', returnTable)}
          data={!isLoading && roles.length ? roles : []}
        ></Table>
      </div>
    </>
  );
}
