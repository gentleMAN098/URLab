import { useI18n } from "@wordpress/react-i18n"
import Checkbox from "../elements/Checkbox"

export default function AllCapabilities(props) {
  const { data } = props
  const { __ } = useI18n()
  return (
    <div className="urlslab-all-capabilities">
      <p style={{ marginBottom: '15px', minWidth: '100%' }}>{__('All capabilities')}</p>
      {data.map((item) => (
        <div className="urlslab-capability-item" style={{ width: '30%' }}>
          <Checkbox>{item.capabilityName}</Checkbox>
        </div>
      ))}
    </div>
  )
}