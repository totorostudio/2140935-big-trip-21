import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createFilterItemTemplate(filterType) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>`
  );
}

function createFiltersItemsTemplate() {
  return Object.values(FilterType).map((value) => createFilterItemTemplate(value)).join('');
}

function createFilterTemplate() {
  const filtersItemsTemplate = createFiltersItemsTemplate();
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #handleFilterChange = null;
  #currentFilter = null;

  constructor({onFilterChange, currentFilter}) {
    super();
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
    this.element.querySelector(`#filter-${currentFilter}`).checked = true;
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    const filterType = evt.target.value;
    this.#handleFilterChange(filterType);
  };
}
