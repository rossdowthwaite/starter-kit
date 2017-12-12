import { starter, pack } from './custom/modules/module_one.js'
import ModuleTwo from './custom/modules/module_two.js'
import ModuleThree from './custom/modules/module_three.js'

starter();
pack();

const module_two = new ModuleTwo('hello', 'you');
module_two.sayThings();

ModuleThree.hello();
ModuleThree.world();

function getUser() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => resolve({user: 'Ross'}), 2000);
  });
}

const user = getUser().then( (user) => {
  console.log(user);
})

async function handleGetUser() {
  const user = await getUser()
  console.log('await/sync', user);
}

handleGetUser()
