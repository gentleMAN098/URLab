import { useEffect, useMemo, useState } from "react";
import { getFetch } from "../api/fetching";
import ModuleViewHeaderBottom from "../components/ModuleViewHeaderBottom";
import Table from "../components/TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

export default function RoleTable() {
  const roleSlug = "permission/role";
  const userSlug = "permission/user";

  const header = {
    name: "Name",
    modules: "Allowed",
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
            Role: cur.role.name,
            Capabilities: Object.keys(cur.role.capabilities).length,
            User: userData.filter((it) => it.roles[0] === cur.role_key).length,
          },
        ];
        return acc;
      }, []);
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

  const columns = useMemo(
    () => [
      columnHelper.accessor("Role"),
      columnHelper.accessor("Capabilities"),
      columnHelper.accessor("User"),
    ],
    []
  );

  return (
    <>
      <ModuleViewHeaderBottom
        noColumnsMenu
        noExport
        noImport
        noFiltering
        noCount
        hideActions
        options={{ header, notWide: true, title: "Add new role", id: "name" }}
      />

      <div className="roles-layout">
        {!isLoading ? (
          <Table
            className="fadeInto"
            slug={roleSlug}
            columns={columns}
            returnTable={(instance) => console.log("return table:", instance)}
            data={roles || []}
            getRowExtraProps={(row) => ({
              onClick: (e) => {
                row.toggleSelected();
              },
              className: row.getIsSelected() ? "bg-blue" : "",
            })}
          />
        ) : (
          "loading..."
        )}
        <div className="urlslab-detailsContainer">
          salam mn container hastam
        </div>
      </div>
    </>
  );
}
