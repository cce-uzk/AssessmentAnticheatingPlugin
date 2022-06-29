<?php
require_once __DIR__ . "/../vendor/autoload.php";

include_once("./Services/UIComponent/classes/class.ilUIHookPluginGUI.php");
include_once("./Services/Init/classes/class.ilStartUpGUI.php");

/**
 * Class ilAssessmentAnticheatingPluginUIHookGUI
 * AntiCheating Userinterface-Hook class
 * @author  Nadimo Staszak <nadimo.staszak@uni-koeln.de>
 * @version $Id$
 * @ingroup ServicesUIComponent
 */
class ilAssessmentAnticheatingPluginUIHookGUI extends ilUIHookPluginGUI
{
    protected $ctrl;
    protected $tpl;
    protected $rbac;
    protected $user;
    protected $plugin;

    /**
     * ilAssessmentAnticheatingPluginUIHookGUI constructor
     */
    public function __construct()
    {
        global $DIC, $tpl;

        $this->ctrl = $DIC->ctrl();
        $this->tpl = $tpl;
        $this->rbac = $DIC->rbac();
        $this->user = $DIC->user();
        $this->plugin = ilAssessmentAnticheatingPlugin::getInstance();

        $this->setPluginObject(ilAssessmentAnticheatingPlugin::getInstance());
    }

    /**
     * Modify HTML output of (all) GUI elements.
     * Adds
     * @param string $a_comp component
     * @param string $a_part string that identifies the part of the UI that is handled
     * @param string $a_par  array of parameters (depend on $a_comp and $a_part)
     * @return array array with entries "mode" => modification mode, "html" => your html
     */
    public function getHTML($a_comp, $a_part, $a_par = array()) : array
    {
		/** @var ilCtrl $ilCtrl */
		/** @var ilTabsGUI $ilTabs */
		global $ilCtrl, $ilTabs;

        // If this method is triggered by loading a 'template' (whole page) and this is not an async call
        if ($a_part == "sub_tabs" && $ilCtrl->getCmdClass() == 'iltestevaluationgui' && !$this->ctrl->isAsynch()) {
            $ilCtrl->saveParameterByClass('ilAssessmentIPRangeFilterPageGUI', 'ref_id');
        }

        // Return without changes
        return array("mode" => ilUIHookPluginGUI::KEEP, "html" => "");
    }

    /**
     * Modify GUI objects, before they generate output
     * @param string $a_comp component
     * @param string $a_part string that identifies the part of the UI that is handled
     * @param string $a_par  array of parameters (depend on $a_comp and $a_part)
     */
    public function modifyGUI($a_comp, $a_part, $a_par = array())
    {

    }
}