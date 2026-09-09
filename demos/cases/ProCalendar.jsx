import { useState, useMemo } from 'react';
import { getData } from '../data';
import { Gantt, Editor } from '../../src';
import { Button } from '@svar-ui/react-core';
import './ProCalendar.css';

function ProCalendar({ skinSettings }) {
  const { tasks: initialTasks, links, scales } = useMemo(
    () => getData('calendar'),
    [],
  );

  const [tasks, setTasks] = useState(initialTasks);
  const [api, setApi] = useState();

  const calendar = useMemo(
    () => ({
      weekHours: {
        monday: 8,
        tuesday: 8,
        wednesday: 8,
        thursday: 8,
        friday: 8,
        saturday: 0,
        sunday: 0,
      },
    }),
    [],
  );

  function addNewRule() {
    const cal = api.getCalendar();
    cal.addRule({
      type: 'weekday',
      weekday: 'wednesday',
      hours: 0,
      name: 'Wednesday off',
    });

    setTasks(
      api.serialize().map(task => {
        if (!cal.isWorkingDay(task.start)) {
          task.start = cal.getNextWorkingDay(task.start);
        }
        return task;
      }),
    );
  }

  return (
    <div className="rows wx-aa4aeCTi">
      <div className="bar wx-aa4aeCTi">
        <span className="wx-aa4aeCTi"> Rule: every Wednesday is off</span>
        <Button type="primary" onClick={addNewRule}>
          Add rule
        </Button>
      </div>

      <div className="gtcell wx-aa4aeCTi">
        <Gantt
          {...skinSettings}
          init={setApi}
          calendar={calendar}
          tasks={tasks}
          links={links}
          scales={scales}
          cellWidth={60}
        />
        {api && <Editor api={api} />}
      </div>
    </div>
  );
}

export default ProCalendar;
