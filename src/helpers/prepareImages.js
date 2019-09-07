const fs = require('fs');
const files = fs
  .readdirSync('../images/club-logos')
  .filter(x => x.includes('png'));
const ex =
  '{\n' +
  files.map(x => `"${x.split('.png')[0]}": require("./${x}"),`).join('\n') +
  '}';
const res = 'export default ' + ex;
fs.writeFileSync('../images/club-logos/index.js', res);

const filesPlayersUniforms = fs
  .readdirSync('../images/uniforms/field-players')
  .filter(x => x.includes('png'));
const exPlayersUniforms =
  '{\n' +
  filesPlayersUniforms
    .map(x => `"${x.split('.png')[0]}": require("./${x}"),`)
    .join('\n') +
  '}';
const resPlayersUniforms = 'export default ' + exPlayersUniforms;
fs.writeFileSync(
  '../images/uniforms/field-players/index.js',
  resPlayersUniforms,
);

const filesGoalkeepersUniforms = fs
  .readdirSync('../images/uniforms/goalkeepers')
  .filter(x => x.includes('png'));
const exGoalkeepersUniforms =
  '{\n' +
  filesGoalkeepersUniforms
    .map(x => `"${x.split('.png')[0]}": require("./${x}"),`)
    .join('\n') +
  '}';
const resGoalkeepersUniforms = 'export default ' + exGoalkeepersUniforms;
fs.writeFileSync(
  '../images/uniforms/goalkeepers/index.js',
  resGoalkeepersUniforms,
);
