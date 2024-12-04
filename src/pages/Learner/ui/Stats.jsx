import LaptopIcon from '@mui/icons-material/Laptop';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import Stat from './Stat';

function Stats() {
  return (
    <>
      <Stat
        title="Hours Spent"
        data="34h"
        bgColor="#e0f7fa"
        iconColor="#00796b"
        iconBgColor="#b2dfdb"
      >
        <LaptopIcon />
      </Stat>
      <Stat
        title="Projects Passed"
        data="1"
        bgColor="#fce4ec"
        iconColor="#880e4f"
        iconBgColor="#f8bbd0"
      >
        <AccountTreeIcon />
      </Stat>
      <Stat
        title="Practices Completed"
        data="8"
        bgColor="#ede7f6"
        iconColor="#5e35b1"
        iconBgColor="#d1c4e9"
      >
        <FitnessCenterIcon />
      </Stat>
      <Stat
        title="Courses Completed"
        data="4"
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
