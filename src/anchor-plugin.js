import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';

/**
 * Inspiré de https://ckeditor.com/docs/ckeditor5/latest/framework/guides/plugins/creating-simple-plugin.html
 */
export default class AnchorPlugin extends Plugin {

     init() {

         this.editor.ui.componentFactory.add('anchor', locale => {
             const view = new ButtonView(locale);

             view.set({
                 label: 'Insérer ancre',
				 // TODO image à définir
                 // icon: '../../../../frontend-bl-ec/src/images/7z.gif',
                 tooltip: true
             });

			 this.editor.model.schema.register( 'anchor', {
				allowWhere: '$block',
				allowContentOf: '$root',
				isObject: true
			 } );
			 this.editor.conversion.elementToElement( {
				model: 'anchor',
				view: {
					name: 'a',
					classes: 'anchor',
					// attributes: {id: '', href: ''},
				}
			 })
			 // partie détaillée inspirée de https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_conversion_conversion-Conversion.html#function-attributeToAttribute
			 this.editor.conversion.attributeToAttribute( {
				 model: {
					 name: 'anchor',
					 key: 'id',
				 },
				 view: {
					 name: 'a',
					 key: 'id',
				 }
			 })

			 this.editor.conversion.attributeToAttribute( {
				 model: {
					 name: 'anchor',
					 key: 'href',
				 },
				 view: {
					 name: 'a',
					 key: 'href',
				 }
			 })

             view.on('execute', () => {

				 // pour ajouter tout simplement un contenu
				 // cf https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/conversion/custom-element-conversion.html
                 this.editor.model.change(viewWriter => {

					 const id = prompt('Choisissez un identifiant')
                     const viewElement = viewWriter.createElement('anchor', {
						 id: id,
						 href:  '#' + id,
					 })
					 const viewSelection = this.editor.model.document.selection;
					viewWriter.wrap( viewSelection.getFirstRange(), viewElement );
                 });

             });

             return view;
         });
    }
}
