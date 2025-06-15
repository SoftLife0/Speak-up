import { Link } from "react-router-dom"

const SummaryCard = ({ label, value, color = "text-black", link }) => {
  const content = (
    <div className={`p-4 bg-white rounded shadow w-48 ${color}`}>
      <h2 className="text-sm font-medium">{label}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )

  return link ? <Link to={link}>{content}</Link> : content
}

export default SummaryCard
