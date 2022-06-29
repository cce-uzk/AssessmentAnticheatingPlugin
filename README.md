# AssessmentAnticheating ILIAS Plugin
### University of Cologne | Competence Center E-Learning
#### Nadimo Staszak

## Installation
### Download via ZIP
Start at your ILIAS root directory. It is assumed the generated downloaded plugin `assac.zip` is in your download folder `~/Downloads`. 
Otherwise, please adjust the commands below.

Run the follow commands:
```bash
mkdir -p Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/AssessmentAnticheating
cd Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/AssessmentAnticheating
mv ~/Downloads/assac.zip assac.zip
unzip assac.zip
unlink assac.zip

Update and activate the plugin in the ILIAS Plugin Administration
```

### Download via GIT
Start at your ILIAS root directory.

Run the follow commands:
```bash
mkdir -p Customizing/global/plugins/Services/UIComponent/AssessmentAnticheating
cd Customizing/global/plugins/Services/UIComponent/AssessmentAnticheating
git clone https://github.com/cce-uzk/AssessmentAnticheating.git AssessmentAnticheating

Update and activate the plugin in the ILIAS Plugin Administration
```

## Update
Start at your ILIAS root directory.
```bash
cd Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/AssessmentAnticheating
git pull
Update and activate the plugin in the ILIAS Plugin Administration
```

## Requirements

* ILIAS 6.0 - 7.999
* PHP >=7.0