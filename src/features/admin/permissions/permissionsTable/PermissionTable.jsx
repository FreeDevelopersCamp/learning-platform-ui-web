import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi2';

import { PAGE_SIZE } from '../../../../utils/constants';
import Pagination from '../../../../ui/Pagination';
import Table from '../../../../ui/Table';
import Menus from '../../../../ui/Menus';
import Modal from '../../../../ui/Modal';
import { getRoleCode } from '../../../../utils/helpers';

const DataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

const PermissionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
`;

const roleToTagName = {
  0: 'rose',
  1: 'purple',
  2: 'lime',
  3: 'teal',
  4: 'green',
  5: 'cyan',
  6: 'blue',
};

const data = [
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Admin',
    permissionRole: ['0'],
  },
  {
    permissionName: 'Delete User',
    permissionRole: ['0'],
  },
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Owner',
    permissionRole: ['0', '1'],
  },
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Manager',
    permissionRole: ['0', '1', '2'],
  },
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Account Manager',
    permissionRole: ['0', '1', '2', '3'],
  },
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Content Manager',
    permissionRole: ['0', '1', '2', '4'],
  },
  {
    permissionName: 'Approve & Reject & Activate & Deactivate Instructor',
    permissionRole: ['0', '1', '2', '3'],
  },
  {
    permissionName: 'Create & Update & Delete Roadmap',
    permissionRole: ['0', '4', '5'],
  },
  {
    permissionName: 'Add tags to Roadmap ( Official, ... )',
    permissionRole: ['0', '4'],
  },
  {
    permissionName: 'View users profiles',
    permissionRole: ['0', '1', '2', '3', '4', '5', '6'],
  },
  {
    permissionName: 'View Roadmap',
    permissionRole: ['0', '1', '2', '3', '4', '5', '6'],
  },
  {
    permissionName: 'Enroll into Roadmap',
    permissionRole: ['6'],
  },
];

function PermissionTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // Role filtering logic
  const roleFilter = searchParams.get('role');
  let filteredData = data.filter((dataItem) => {
    if (roleFilter && roleFilter !== 'all') {
      const roleMap = {
        admin: '0',
        owner: '1',
        manager: '2',
        'account-manager': '3',
        'content-manager': '4',
        instructor: '5',
        learner: '6',
      };
      return dataItem.permissionRole.includes(roleMap[roleFilter]);
    }
    return true;
  });

  // Sorting logic
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');

  const sortedData = [...filteredData].sort((a, b) => {
    const getRolePriority = (dataItem) => {
      // Roles array as numbers
      const roles = dataItem.permissionRole.map(Number);

      // For ascending order, prioritize the smallest role number (Admin = 0)
      if (direction === 'asc') {
        return Math.min(...roles); // Find the smallest role
      } else {
        // For descending order, prioritize the largest role number (Learner = 6)
        return Math.max(...roles); // Find the largest role
      }
    };

    const valueA =
      field === 'name' ? a.permissionName.toLowerCase() : getRolePriority(a);
    const valueB =
      field === 'name' ? b.permissionName.toLowerCase() : getRolePriority(b);

    // Sorting for the role field
    if (field === 'role') {
      // If comparing roles, compare the role priority values
      if (direction === 'asc') {
        return valueA - valueB; // Ascending
      } else {
        return valueB - valueA; // Descending
      }
    }

    // Sorting for the name field
    return direction === 'asc'
      ? valueA.localeCompare(valueB) // Ascending alphabetical order
      : valueB.localeCompare(valueA); // Descending alphabetical order
  });

  // Pagination
  const totalRows = sortedData.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setSearchParams(page);
  };

  return (
    <Menus>
      <Table columns="3.5fr 3fr 1fr 0.01px">
        <Table.Header>
          <div>Permission Name</div>
          <div>Assigned to</div>
          <div>
            <button>Add Permission</button>
          </div>
        </Table.Header>

        <Table.Body
          data={paginatedData}
          render={(dataItem) => {
            return (
              <Table.Row
                key={`${dataItem.permissionName}-${dataItem.permissionRole}`}
              >
                <DataRow className="flex items-center gap-4">
                  {dataItem.permissionName}
                </DataRow>
                <PermissionRow>
                  {dataItem.permissionRole.map((role) => (
                    <Tag
                      key={`${dataItem.permissionName}-${role}`}
                      type={roleToTagName[role]}
                    >
                      {getRoleCode(role)}
                    </Tag>
                  ))}
                </PermissionRow>
                <Modal>
                  <Menus.Menu>
                    <Menus.Toggle />
                    <Menus.List>
                      <Modal.Open opens="edit">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                      </Modal.Open>
                      <Modal.Open opens="delete">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                      </Modal.Open>
                    </Menus.List>
                  </Menus.Menu>
                </Modal>
              </Table.Row>
            );
          }}
        />

        <Table.Footer>
          <Pagination
            count={totalRows}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PermissionTable;
