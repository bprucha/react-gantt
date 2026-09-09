import { useState, useMemo } from 'react';
import { getData } from '../data';
import { Gantt, ContextMenu, Editor, Toolbar, Tooltip } from '../../src/';
import MySegmentTooltip from '../custom/MySegmentTooltip';
import './ProSplitTasks.css';

export default function ProSplitTasks({ skinSettings }) {
  const [api, setApi] = useState();
  const data = useMemo(() => getData('day', { splitTasks: true }), []);

  return (
    <>
      <Toolbar api={api} />
      <div className="gtcell wx-4eOjA4yB">
        <ContextMenu api={api}>
          <Tooltip api={api} content={MySegmentTooltip}>
            <Gantt
              init={setApi}
              {...skinSettings}
              tasks={data.tasks}
              links={data.links}
              scales={data.scales}
              splitTasks={true}
            />
          </Tooltip>
        </ContextMenu>
        {api && <Editor api={api} />}
      </div>
    </>
  );
}
