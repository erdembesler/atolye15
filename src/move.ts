type List = {
  id: string;
  name: string;
  files: {
    id: string;
    name: string;
  }[];
}[];

let destinationExists = false;
let fileExist = false;
let destinationFolderIndex: number;

export default function move(list: List, source: string, destination: string): List {
  list.forEach((element) => {
    if (element.id === destination) {
      destinationExists = true;
      destinationFolderIndex = list.indexOf(element);
    }
  });

  if (destinationExists) {
    list.forEach((element) => {
      element.files.forEach((file) => {
        if (file.id === source) {
          if (element.id === list[destinationFolderIndex].id && !fileExist) {
            throw new Error('You cannot move a file to the same destination');
          }
          if (!fileExist) {
            const removeIndex = element.files
              .map(function mapIt(item) {
                return item.id;
              })
              .indexOf(file.id);
            element.files.splice(removeIndex, 1);
            list[destinationFolderIndex].files.push(file);
            fileExist = true;
          }
        }
      });
    });
    if (!fileExist) {
      throw new Error('You cannot move a folder');
    }
  } else {
    throw new Error('You cannot specify a file as the destination');
  }
  return list;
}
