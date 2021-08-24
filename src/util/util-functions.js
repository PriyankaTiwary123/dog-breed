export const debounceFunction = (func, delay) => {
  let timer;
  return function () {
    let self = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};

export const sortHeightData = (dogList, sortingField) => {
  return (
    dogList &&
    dogList
      .slice()
      .sort((a, b) =>
        a[sortingField].imperial.split("-").length === 2
          ? a[sortingField].imperial
              .split("-")[1]
              .localeCompare(
                b[sortingField].imperial.split("-").length === 2
                  ? b[sortingField].imperial.split("-")[1]
                  : b[sortingField].imperial.split("-")[0]
              )
          : a[sortingField].imperial
              .split("-")[0]
              .localeCompare(
                b[sortingField].imperial.split("-").length === 2
                  ? b[sortingField].imperial.split("-")[1]
                  : b[sortingField].imperial.split("-")[0]
              )
      )
  );
};

export const sortLifeSpanData = (dogList, sortingField) => {
  return (
    dogList &&
    dogList.slice().sort((a, b) =>
      a[sortingField].split("-").length === 2
        ? a[sortingField]
            .split("-")[1]
            .split("y")[0]
            .localeCompare(
              b[sortingField].split("-").length === 2
                ? b[sortingField].split("-")[1].split("y")[0]
                : b[sortingField].split("y")[0]
            )
        : a[sortingField]
            .split("y")[0]
            .localeCompare(
              b[sortingField].split("-").length === 2
                ? b[sortingField].split("-")[1].split("y")[0]
                : b[sortingField].split("y")[0]
            )
    )
  );
};
