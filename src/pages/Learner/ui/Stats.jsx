import LaptopIcon from '@mui/icons-material/Laptop';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { formatDuration } from '../../../utils/helpers';
import Stat from './Stat';

function Stats({ userProgress }) {
  const passedProjectsCount =
    userProgress?.currentProjectsIds?.filter(
      (project) => project.status === '2',
    ).length || 0;

  return (
    <>
      <Stat
        title="Hours Spent"
        data={formatDuration(userProgress.spentTime)}
        bgColor="#e0f7fa"
        iconColor="#00796b"
        iconBgColor="#b2dfdb"
      >
        <LaptopIcon />
      </Stat>
      <Stat
        title="Projects Passed"
        data={passedProjectsCount}
        bgColor="#fce4ec"
        iconColor="#880e4f"
        iconBgColor="#f8bbd0"
      >
        <AccountTreeIcon />
      </Stat>
      <Stat
        title="Practices Completed"
        data={userProgress.completedPracticesIds.length}
        bgColor="#ede7f6"
        iconColor="#5e35b1"
        iconBgColor="#d1c4e9"
      >
        <FitnessCenterIcon />
      </Stat>
      <Stat
        title="Courses Completed"
        data={userProgress.completedCoursesIds.length}
        bgColor="#fff3e0"
        iconColor="#e65100"
        iconBgColor="#ffcc80"
      >
        <TipsAndUpdatesIcon />
      </Stat>
    </>
  );
}

export default Stats;
