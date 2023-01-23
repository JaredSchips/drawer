const picturesDiv = document.getElementById('pictures')
const pictureDivArr = picturesDiv.children

for (div of pictureDivArr) {
    const imgId = div.dataset.imgId
    const a = div.firstElementChild
    const snapshot = publicImages
        .filter(imgObj => imgObj.dataValues.id == imgId)[0]
        .dataValues.snapshot
    const canvas = LC.renderSnapshotToImage(snapshot)
    a.prepend(canvas)
};