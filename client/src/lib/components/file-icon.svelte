<script>
    export let link;

    let computeIcon = () => {
        let filetype = link.split('.')[link.split('.').length-1];

        let out = 'fa-file';

        switch (filetype) {
            case "pdf":
                out = "fa-file-pdf"
                break;
            
            case "jpg":
                out = "fa-file-image"
                break;

            case "html":
                out = "fa-code"
                break;

            case "JPG":
                out = "fa-file-image"
                break;

            case "jpeg":
                out = "fa-file-image"
                break;
            
            case "png":
                out = "fa-file-image"
                break;

            case "docx":
                out = "fa-file-word"
                break;

            case "pptx":
                out = "fa-file-powerpoint"
                break;

            case "xlsx":
                out = "fa-file-excel"
                break;

            case "xls":
                out = "fa-file-excel"
                break;

            case "zip":
                out = "fa-file-zipper"
                break;

            case "csv":
                out = "fa-file-csv"
                break;

            case "eml":
                out = "fa-envelope"
                break;
        
            default:
                out = "fa-file"
                break;
        }

        return out;
    }

    let icon = computeIcon()
</script>

<div>
    <a href={link}>
        <i class="fa-solid {icon}" />
    </a>
</div>
