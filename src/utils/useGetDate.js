const useGetPromptDate = (postDate) => {
  try {
    if (!postDate) return '';

    const date = new Date(postDate);

    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error while formatting post date:', error);
    return '';
  }
};

const useGetUserJoinedDate = (postDate) => {
  try {
    if (!postDate) return '';

    const date = new Date(postDate);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error while formatting post date:', error);
    return '';
  }
};

export { useGetPromptDate, useGetUserJoinedDate };
