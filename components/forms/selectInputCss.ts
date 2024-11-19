
const customStyles = {
  /*
    Styles pour l'élément de contrôle (la boîte de sélection elle-même).
  */
  control: (provided, state) => ({
    /*
      Fusionne les styles par défaut avec les styles personnalisés.
    */
    ...provided,
    /*
      Définit la couleur de fond, la couleur de la bordure et la couleur du texte.
    */
    backgroundColor: "var(--select-background-color)",
    borderColor: "var(--select-border-color)",
    color: "var(--select-text-color)",
    /*
      Styles pour le survol de l'élément de contrôle.
    */
    "&:hover": {
      borderColor: "var(--select-border-hover-color)",
    },
  }),

  /*
    Styles pour les options de la sélection.
  */
  option: (provided, state) => ({
    ...provided,
    /*
      La couleur de fond de l'option varie selon qu'elle est sélectionnée ou non.
    */
    backgroundColor: state.isSelected
      ? "var(--select-option-selected-background-color)"
      : "var(--select-option-background-color)",
    color: "var(--select-option-text-color)",
    /*
      Styles pour le survol d'une option.
    */
    "&:hover": {
      backgroundColor: "var(--select-option-hover-background-color)",
    },
  }),

  /*
    Styles pour la valeur unique affichée lorsqu'une option est sélectionnée.
  */
  singleValue: (provided) => ({
    ...provided,
    color: "var(--select-value-text-color)",
  }),

  /*
    Styles pour le menu déroulant contenant les options.
  */
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--select-menu-background-color)",
  }),
};

export default customStyles;