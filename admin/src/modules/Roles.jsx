// eslint-disable-next-line import/no-extraneous-dependencies

import "../assets/styles/layouts/_Roles.scss";

export default function Roles({ className, settingId, moduleId, modules }) {
  console.log(modules);
  return (
    <div className="urlslab-roles">
      <p>{moduleId}</p>
    </div>
  );
}
