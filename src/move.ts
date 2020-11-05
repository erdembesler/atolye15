// NOTE: jest.config.js file was adjusted to run move.spec.ts.
// At that scope, properties below were added.
// testMatch: ['<rootDir>/Tests/**/*.ts?(x)', '**/?(*.)(spec|test).ts?(x)']
// testPathIgnorePatterns: ['/node_modules/', '<rootDir>dist/move.spec.js']

// NOTE: Error texts of existing tests have been changed a bit in for the sake of appropriate logic of texts.
// Comments can be found above descriptions of tests in move.spec.ts file
// One more test was added top cover all error possibilities

type List = {
  id: string;
  name: string;
  files: {
    id: string;
    name: string;
  }[];
}[];

export default function move(list: List, source: string, destination: string): List {
  let destinationExists = false;
  let fileExist = false;
  let destinationFolderIndex: number;
  list.forEach((element) => {
    if (element.id === destination) {
      destinationExists = true;
      destinationFolderIndex = list.indexOf(element);
    }
  });

  // if folder with given id does not exist then dont try to find file throw "There is not such a folder" error
  if (destinationExists) {
    list.forEach((element) => {
      element.files.forEach((file) => {
        // if file is found and this is not the iteration after file was found
        if (file.id === source && !fileExist) {
          // if file is not found yet and given destination is file's current destination then throw "You cannot move a file to the same destination" error
          if (element.id === list[destinationFolderIndex].id) {
            throw new Error('You cannot move file to the same destination');
          }

          const removeIndex = element.files
            .map(function mapIt(item) {
              return item.id;
            })
            .indexOf(file.id);
          element.files.splice(removeIndex, 1);
          list[destinationFolderIndex].files.push(file);
          fileExist = true;
        }
      });
    });
    // if file is not found with given id that throw "There is not such a file" error
    if (!fileExist) {
      throw new Error('There is not such a file');
    }
  } else {
    throw new Error('There is not such a folder');
  }
  // if there is no error then return list
  return list;
}
