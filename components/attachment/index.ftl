<div style="display: none">
    <form method="post" :action="url" id="attachment-file-form" target="upload_callback" enctype="multipart/form-data">
        <input type="file" name="attachment" id="attachment-file-input" @change="attachmentFileInputChange">
        <input type="hidden" name="business" :value="business">
    </form>
</div>