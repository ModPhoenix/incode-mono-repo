import { MemoryRouter } from 'react-router';
import TaskCard from './task_card';

const mockTask = {
  status: 'To do',
  _id: '5b39e7e11deb0934993043cc',
  title: 'Mock Title',
  description: 'Mock Description',
};

it('render correctly', () => {
  const wrapper = shallow(
    <TaskCard
      data={mockTask}
      editTask={() => {}}
      deleteTask={() => {}}
      isSuperuser
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('displaying data correctly', () => {
  const wrapper = mount(
    <MemoryRouter>
      <TaskCard
        data={mockTask}
        editTask={() => {}}
        deleteTask={() => {}}
        isSuperuser
      />
    </MemoryRouter>,
  );

  const id = wrapper.find('.task-id').first().text();
  const title = wrapper.find('.task-title').first().text();
  const description = wrapper.find('.task-description').first().text();


  expect(id).toEqual('ID: 5b39e7e11deb0934993043cc');
  expect(title).toEqual('Mock Title');
  expect(description).toEqual('Mock Description');
});
