import { Catalog } from 'react-planner';
import Areas from './areas/index';
import Lines from './lines/index';
import Holes from './holes/index';
import Items from './items/index';

let catalog = new Catalog();

for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Areas) catalog.registerElement(Areas[x])
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);

catalog.registerCategory('windows', 'Windows', [Holes.window, Holes['sash-window'], Holes['venetian-blind-window'], Holes['window-curtain']]);
catalog.registerCategory('doors', 'Doors', [Holes.door, Holes['door-double'], Holes['panic-door'], Holes[ 'panic-door-double'], Holes['sliding-door']]);
catalog.registerCategory('wall', 'Wall', [Lines.wall]);
catalog.registerCategory('gate', 'Gate', [Holes.gate]);





export default catalog;
