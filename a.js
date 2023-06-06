const FileUpload = require('express-fileupload');
const app = express();

app.use(
    FileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        safeFileNames: true,
        preserveExtension: true,
        abortOnLimit: true,
        responseOnLimit: 'File size limit has been reached',
    }),
);

export default async function Uploader(Req, Folder, FileTypes = [' image/png', 'image/jpeg', 'image/jpg']) {
    if (Req.files === null) {
        return 'No file uploaded';
    } else if (Req.files.file.length > 1) {
        for (const File of Req.files.file) {
            if (FileTypes.includes(File.mimetype)) {
                const FileName = File.name;
                const FileExt = File.mimetype.split('/')[1];
                const FileNewName = `${FileName}-${Date.now()}.${FileExt}`;
                const FileNewPath = `./public/uploads/${Folder}/${FileNewName}`;
                const FileUrl = `uploads/${Folder}/${FileNewName}`;

                await File.mv(FileNewPath);
                return FileUrl;
            } else {
                return 'File type not supported';
            }
        }
    } else {
        const File = Req.files.file;
        if (FileTypes.includes(File.mimetype)) {
            const FileName = File.name;
            const FileExt = File.mimetype.split('/')[1];
            const FileNewName = `${FileName}-${Date.now()}.${FileExt}`;
            const FileNewPath = `./public/uploads/${Folder}/${FileNewName}`;
            const FileUrl = `uploads/${Folder}/${FileNewName}`;

            await File.mv(FileNewPath);
            return FileUrl;
        } else {
            return 'File type not supported';
        }
    }
}
