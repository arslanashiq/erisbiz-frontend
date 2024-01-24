export const getMenuState = () => {
  const value = sessionStorage.getItem('menu-state');
  if (value === false || value === 'false') {
    return false;
  }
  return true;
};

export const convertURLToFile = async () => {
  try {
    const url =
      'https://trends-review.s3.amazonaws.com/media/article/Article-article-main-image/stop_c6uS1Fk.jpeg';
    let fileName = url.substring(url.lastIndexOf('/') + 1);
    const newFileName = fileName.split('?')[0];
    if (newFileName) fileName = newFileName;
    const response = await fetch(`${url}`);
    const blob = await response.blob();
    const file = new File([blob], `${fileName}`, {
      type: blob.type,
    });

    console.log(blob);
    return file;
  } catch (error) {
    return error;
  }
};
