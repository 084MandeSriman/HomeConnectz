import { useSearchParams } from 'react-router-dom';
import ProjectsSection from './home/ProjectsSection.jsx';
import { TYPES, statuses } from './home/homeData.js';
import './home/home.css';

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const requestedStatus = params.get('status');
  const status = statuses.some((item) => item.key === requestedStatus) ? requestedStatus : 'completed';
  const requestedType = params.get('type');
  const type = TYPES.some(([key]) => key === requestedType) ? requestedType : 'all';

  return (
    <ProjectsSection
      status={status}
      type={type}
      onFiltersChange={(nextStatus, nextType) => setParams({ status: nextStatus, type: nextType })}
    />
  );
}
