import Empty from '@/ui/Empty.jsx';

import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import Pagination from '../../ui/Tables/Pagination.jsx';
import CourseRow from '../../ui/CoursesTable/CourseRow.jsx';

function CourseTable({ courses, count }) {
  if (!courses?.length) return <Empty resourceName="Courses Table" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header>
          <div>Course Name</div>
          <div>Category</div>
          <div>Topic</div>
          <div>Duration</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={courses}
          render={(course) => <CourseRow key={course._id} course={course} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CourseTable;
