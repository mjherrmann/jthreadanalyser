<script>
    import {FileStore} from "../stores/FileStore"
    let highlight = false;
    function handleDragOver(e) {
        highlight = true;
    }
    function handleDragIn(e) {
        highlight = true;
    }
    function handleDragOut(e) {
        highlight = false;
    }

    async function handleDrop(e) {
        highlight = false;
        let files = [];
        for(let item of e.dataTransfer.items){

            let entry  = item.webkitGetAsEntry();
            if(entry){
                if(entry.isDirectory){
                    let entries = await traverseDirectory(entry);
                    files = files.concat(entries);
                }else{
                    files = files.concat([entry])
                }
            }else{
                console.log("error: not dropped", item, entry);
            }
            
        }

        FileStore.addFiles(files);

    }
    async function traverseDirectory(dir){
        let returnFiles = [];

        let direntries = await readDirectory(dir);
        for(let entry of direntries){
            if(entry.isDirectory){
                let entries = await traverseDirectory(entry);
                returnFiles = returnFiles.concat(entries);
            }else{
                returnFiles = returnFiles.concat([entry])
            }
        }
        return returnFiles;
    }
    async function readDirectory(dir){
    return new Promise((resolve,reject)=>{
      dir.createReader().readEntries((entries)=>{
        resolve(entries);
      },(err)=>{
        reject(err);
      });
    });
  }

</script>
<style>
    .highlight{
        border:3px solid RGB(0, 128, 0, .5) !important;
        background-color: RGB(0, 255, 0, .05) !important;
        
    }
    .dropzone {
        line-height: 100px;
        height:100px;
        border:3px dashed RGB(0, 0, 128, .5);
        background-color: RGB(0, 0, 255, .05);
        
    }
</style>
<div class="{highlight?'highlight':''} dropzone"
    on:dragenter|preventDefault={handleDragIn} 
    on:dragleave|preventDefault={handleDragOut} 
    on:dragover|preventDefault={handleDragOver} 
    on:drop|preventDefault={handleDrop}
    >
    Drop area
</div>
