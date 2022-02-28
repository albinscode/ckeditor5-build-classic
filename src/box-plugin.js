import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';

export default class BoxPlugin extends Plugin {

     init() {

         this.editor.ui.componentFactory.add('box', locale => {
             const view = new ButtonView(locale);

             view.set({
                 label: 'Boite info',
                 // icon: '../../../../frontend-bl-ec/src/images/7z.gif',
                 tooltip: true
             });

			 this.editor.model.schema.register( 'box-error', {
				allowWhere: '$block',
				allowContentOf: '$root',
				isObject: true
			 } );
			 // 2. The conversion is straightforward:
			 this.editor.conversion.elementToElement( {
				model: 'box-error',
				view: {
					name: 'div',
					classes: 'error'
				}
			 } );

             view.on('execute', () => {

				 // pour ajouter tout simplement un contenu
				 // cf https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/conversion/custom-element-conversion.html
                 this.editor.model.change(writer => {

					 // ajout donnée directe
                     const element = writer.createElement('box-error', {
					 })
					 this.editor.model.insertContent(element, this.editor.model.document.selection)
                 });

             });

             return view;
         });
    }
}
