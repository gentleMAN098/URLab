import { useEffect, useMemo, useState } from "react";
import { getFetch } from "../api/fetching";
import ModuleViewHeaderBottom from "../components/ModuleViewHeaderBottom";
import Table from "../components/TableComponent";
import { createColumnHelper } from "@tanstack/react-table";

export default function UserTable() {
  const userSlug = "permission/user";
  const capabilitiesSlug = "permission/capabilities";

  const header = {
    name: "Name",
    modules: "Allowed",
  };
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const userRes = await getFetch(userSlug);
      const userData = await userRes.json();
      const capabilitiesRes = await getFetch(capabilitiesSlug);
      const capabilitiesData = await capabilitiesRes.json();
      console.log("capabilitiesData", capabilitiesData);
      console.log("userData", userData);
      const normalizeTableData = userData.reduce((acc, cur) => {
        acc = [
          ...acc,
          {
            label: cur.role.name,
            capabilities: Object.keys(cur.role.capabilities).length,
            capabilitie: capabilitiesData.filter(
              (it) => it.roles[0] === cur.role_key
            ).length,
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

  const columns = [
    columnHelper.accessor("User"),
    columnHelper.accessor("Capabilities"),
    columnHelper.accessor("Role"),
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
        options={{ header, notWide: true, title: "Add user", id: "name" }}
      />
      <div className="urlslab-tableContainer">
        <Table
          className="fadeInto"
          slug={capabilitiesSlug}
          columns={columns}
          returnTable={(returnTable) => console.log(returnTable)}
          data={!isLoading && roles.length ? roles : []}
        ></Table>
      </div>
    </>
  );
}
